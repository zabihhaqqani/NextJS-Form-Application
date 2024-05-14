// pages/api/contact.ts

import { NextApiRequest, NextApiResponse } from "next"

interface FormData {
  id: string
  name: string
  email: string
  message: string
}

let formDataList: FormData[] = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id, name, email, message }: FormData = req.body

      formDataList.push({ id, name, email, message })

      res.status(200).json({ message: "Form submitted successfully" })
    } catch (error) {
      console.error("Error submitting form:", error)
      res
        .status(500)
        .json({ error: "An error occurred while submitting the form" })
    }
  } else if (req.method === "GET") {
    res.status(200).json(formDataList)
  } else if (req.method === "DELETE") {
    const { contact } = req.query
    const id = contact[1]
    formDataList = formDataList.filter((data) => data.id !== id)
    res.status(200).json({ message: "Form data deleted successfully" })
  } else if (req.method === "PUT") {
    const updatedData = req.body

    formDataList = formDataList.map((data) => {
      if (data.id === updatedData.id) {
        return { ...data, ...updatedData }
      } else {
        return data
      }
    })

    res.status(200).json({ message: "Form data updated successfully" })
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"])
    res.status(405).end("Method Not Allowed")
  }
}
