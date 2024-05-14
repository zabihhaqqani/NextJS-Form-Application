"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Navbar from "../../components/navbar"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table"
import { Edit } from "../../components/edit"

interface FormData {
  id: string
  name: string
  email: string
  message: string
}

export default function Admin() {
  const [formData, setFormData] = useState<FormData[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get<FormData[]>("/api/contact")
      setFormData(response.data)
    } catch (error) {
      console.error("Error fetching form data:", error)
    }
  }

  const deleteFormData = async (id: string) => {
    try {
      await axios.delete(`/api/contact/${id}`)
      fetchData()
    } catch (error) {
      console.error("Error deleting form data:", error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-between p-10">
        <h1 className="font-semibold text-2xl">Admin Panel</h1>
        {formData.length > 0 ? (
          <div>
            <h2 className="my-4"> Form Submissions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>{" "}
              </TableHeader>
              <TableBody>
                {formData?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.message}</TableCell>
                    <Button
                      type="submit"
                      variant="default"
                      onClick={() => deleteFormData(data.id)}
                    >
                      Delete
                    </Button>

                    <Edit
                      data={data}
                      fetchData={() => fetchData(setFormData)}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="my-3">No Submissions!</p>
        )}
      </div>
    </div>
  )
}
