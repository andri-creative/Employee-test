"use client";

import { useState } from "react";
import {
  Card,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  Spinner,
} from "@radix-ui/themes";

type Status = "idle" | "loading" | "success" | "error";

export default function UploadEmployee() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setStatus("error");
      setMessage("Please select a CSV file");
      return;
    }

    setStatus("loading");
    setMessage("Uploading file, please wait...");

    const formData = new FormData();
    formData.append("employeeFile", file);

    try {
      const res = await fetch("/api/upload-employee", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setStatus("success");
      setMessage(`Upload success: ${data.total} employees inserted`);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  }

  return (
    <Flex
      align="center"
      justify="center"
      style={{ minHeight: "100vh", background: "var(--gray-2)" }}
    >
      <Card size="3" style={{ width: 420 }}>
        <Heading size="4" mb="1">
          Upload Employee Data
        </Heading>

        <Text size="2" color="gray" mb="4">
          Upload employee data in CSV format (name, age, position, salary)
        </Text>

        {/* 🔔 STATUS MESSAGE */}
        {status !== "idle" && (
          <Box
            mb="4"
            p="3"
            style={{
              borderRadius: 8,
              background:
                status === "loading"
                  ? "var(--blue-3)"
                  : status === "success"
                  ? "var(--green-3)"
                  : "var(--red-3)",
              color:
                status === "loading"
                  ? "var(--blue-11)"
                  : status === "success"
                  ? "var(--green-11)"
                  : "var(--red-11)",
            }}
          >
            <Flex align="center" gap="2">
              {status === "loading" && <Spinner size="2" />}
              <Text size="2">{message}</Text>
            </Flex>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <input
              type="file"
              accept=".csv"
              disabled={status === "loading"}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Uploading..." : "Upload CSV"}
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}
