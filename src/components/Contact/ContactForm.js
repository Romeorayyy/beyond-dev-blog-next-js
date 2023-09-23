'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

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
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
      focus:border-gray bg-transparent"
      />
      and I'm reaching out regarding{' '}
      <input
        type="text"
        placeholder="e.g., a coding question, an affiliate product, financial insights"
        {...register('subject', { required: true, maxLength: 200 })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
      focus:border-gray bg-transparent"
      />
      You can email me back at
      <input
        type="email"
        placeholder="your@email"
        {...register('email', {})}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
      focus:border-gray bg-transparent"
      />
      Here's more about my inquiry: <br />
      <textarea
        {...register('inquiry details', {})}
        placeholder="I'd like to know more about..."
        rows={3}
        className="w-full outline-none border-0 p-0 mx-0 focus:ring-0 placeholder:text-lg border-b border-gray 
      focus:border-gray bg-transparent"
      />
      <input
        type="submit"
        value="send message"
        className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer"
      />
    </form>
  );
}
