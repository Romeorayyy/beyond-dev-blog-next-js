'use client'; // The 'use client' you had is not valid, assuming you meant 'use strict'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setFeedback('Email sent successfully!');
        reset();
      } else {
        setFeedback('Error sending email. Please try again later.');
      }
    } catch (error) {
      setFeedback('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed font-in"
    >
      Hello! My name is{' '}
      <input
        type="text"
        placeholder="your name"
        {...register('name', { required: true, maxLength: 80 })}
        className={`outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b ${
          errors.name ? 'border-red-500' : 'border-gray'
        } 
        focus:border-gray bg-transparent`}
      />
      and I'm reaching out regarding{' '}
      <input
        type="text"
        placeholder="e.g., a coding question, an affiliate product, financial insights"
        {...register('subject', { required: true, maxLength: 200 })}
        className={`outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b ${
          errors.subject ? 'border-red-500' : 'border-gray'
        } 
        focus:border-gray bg-transparent`}
      />
      You can email me back at
      <input
        type="email"
        placeholder="your@email"
        {...register('email', { required: true })} // Made the email field required
        className={`outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b ${
          errors.email ? 'border-red-500' : 'border-gray'
        } 
        focus:border-gray bg-transparent`}
      />
      Here's more about my inquiry: <br />
      <textarea
        {...register('inquiryDetails', { required: true })}
        placeholder="I'd like to know more about..."
        rows={3}
        className={`w-full outline-none border-0 p-0 mx-0 focus:ring-0 placeholder:text-lg border-b ${
          errors.inquiryDetails ? 'border-red-500' : 'border-gray'
        } 
        focus:border-gray bg-transparent`}
      />
      <input
        type="submit"
        value="send message"
        className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer hover:scale-125 transition-all ease duration-200 active:scale-95"
      />
      {/* Display feedback to user */}
      {feedback && <div className="mt-4">{feedback}</div>}
    </form>
  );
}
