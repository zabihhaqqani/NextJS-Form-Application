"use client"

import { FormEvent, useState } from "react"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const ContactForm = () => {
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post("/api/contact", {
        id: uuidv4(),
        name,
        email,
        message,
      })

      if (res.status === 200) {
        setSubmitted(true)
      }
    } catch (err: any) {
      console.error("Err", err)
    }
  }

  return isSubmitted ? (
    <div>
      <h1 className="text-center font-semibold text-3xl">
        Thank you for filling the form!
        <Link href="/admin">
          <p className="text-black hover:text-gray-300 text-xl my-4 underline">
            Checkout all the submissions
          </p>
        </Link>
      </h1>
    </div>
  ) : (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 bg-slate-100 p-5 rounded-md"
    >
      <div>
        <h3 className="font-semibold ">Contact Form</h3>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="mt-2 ">
            Full Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="mt-2">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-white"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="mt-2">
            Message
          </Label>
          <Input
            type="text"
            id="message"
            placeholder="johndoe@gmail.com"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white"
            required
          />
        </div>
      </div>
      <Button type="submit" variant="default">
        Submit
      </Button>
    </form>
  )
}
