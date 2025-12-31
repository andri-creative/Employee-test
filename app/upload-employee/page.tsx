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
import { Upload, CheckCircle, AlertCircle } from "lucide-react"; // Tambahkan import untuk icon

type Status = "idle" | "loading" | "success" | "error";

export default function UploadEmployee() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState<any>(null); // Tambahkan state untuk responseData

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
      setMessage(
        `Upload success: ${
          data.total || data.processedRows || data.totalEmployees || 0
        } employees inserted`
      );
      setResponseData(data); // Simpan response data
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  }

  return (
    <Flex
      align="center"
      justify="center"
      style={{ minHeight: "calc(100vh - 64px)", background: "var(--gray-2)" }}
    >
      <Card size="3" style={{ width: 480, maxWidth: "90vw" }}>
        <Flex direction="column" gap="2" mb="4">
          <Heading size="5">Upload Employee Data</Heading>
          <Text size="2" color="gray">
            Upload employee data in CSV format (name, age, position, salary)
          </Text>
        </Flex>

        {/* 🔔 STATUS MESSAGE */}
        {status !== "idle" && (
          <Box
            mb="4"
            p="3"
            style={{
              borderRadius: 8,
              border: `1px solid ${
                status === "loading"
                  ? "var(--blue-6)"
                  : status === "success"
                  ? "var(--green-6)"
                  : "var(--red-6)"
              }`,
              background:
                status === "loading"
                  ? "var(--blue-2)"
                  : status === "success"
                  ? "var(--green-2)"
                  : "var(--red-2)",
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
              {status === "success" && <CheckCircle size={16} />}
              {status === "error" && <AlertCircle size={16} />}
              <Text size="2" weight="medium">
                {message}
              </Text>
            </Flex>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {/* Upload Area */}
            <Box
              style={{
                border: "2px dashed var(--gray-6)",
                borderRadius: 12,
                padding: "2rem",
                textAlign: "center",
                background: file ? "var(--accent-a2)" : "var(--gray-1)",
                transition: "all 0.2s",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => document.getElementById("file-upload")?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = "var(--accent-8)";
                e.currentTarget.style.background = "var(--accent-a2)";
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = "var(--gray-6)";
                e.currentTarget.style.background = file
                  ? "var(--accent-a2)"
                  : "var(--gray-1)";
              }}
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files.length > 0 && files[0].type === "text/csv") {
                  setFile(files[0]);
                }
                e.currentTarget.style.borderColor = "var(--gray-6)";
                e.currentTarget.style.background = "var(--accent-a2)";
              }}
            >
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                disabled={status === "loading"}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />

              <Flex direction="column" align="center" gap="3">
                <Box
                  style={{
                    padding: "12px",
                    borderRadius: "50%",
                    background: "var(--accent-a3)",
                    color: "var(--accent-11)",
                  }}
                >
                  <Upload size={24} />
                </Box>

                {file ? (
                  <Flex direction="column" align="center" gap="1">
                    <Text size="3" weight="medium">
                      {file.name}
                    </Text>
                    <Text size="1" color="gray">
                      {(file.size / 1024).toFixed(2)} KB • Click to change file
                    </Text>
                  </Flex>
                ) : (
                  <Flex direction="column" align="center" gap="1">
                    <Text size="3" weight="medium">
                      Choose a CSV file or drag & drop
                    </Text>
                    <Text size="1" color="gray">
                      Supports .csv files only
                    </Text>
                  </Flex>
                )}

                <Button
                  variant="soft"
                  size="2"
                  style={{ marginTop: "8px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("file-upload")?.click();
                  }}
                >
                  Browse Files
                </Button>
              </Flex>
            </Box>

            {/* File Requirements */}
            <Box
              p="3"
              style={{
                background: "var(--gray-1)",
                borderRadius: 8,
                border: "1px solid var(--gray-5)",
              }}
            >
              <Text size="1" weight="medium" mb="2">
                CSV Format Requirements:
              </Text>
              <Text size="1" color="gray" as="div">
                • Required columns: name, age, position, salary
                <br />
                • First row should be headers
                <br />
                • Use commas as separators
                <br />• Maximum file size: 10MB
              </Text>
            </Box>

            {/* Upload Button */}
            <Flex gap="2">
              {file && (
                <Button
                  type="button"
                  variant="soft"
                  color="gray"
                  disabled={status === "loading"}
                  onClick={() => setFile(null)}
                  style={{ flex: 1 }}
                >
                  Remove File
                </Button>
              )}
              <Button
                type="submit"
                disabled={status === "loading" || !file}
                style={{ flex: 2 }}
              >
                {status === "loading" ? (
                  <Flex align="center" gap="2">
                    <Spinner size="1" />
                    Uploading...
                  </Flex>
                ) : (
                  `Upload ${file ? `"${file.name}"` : "CSV"}`
                )}
              </Button>
            </Flex>
          </Flex>
        </form>

        {/* Success Details */}
        {status === "success" && responseData && (
          <Box
            mt="4"
            p="3"
            style={{
              background: "var(--green-2)",
              borderRadius: 8,
              border: "1px solid var(--green-6)",
            }}
          >
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium" color="green">
                Upload Successful!
              </Text>
              <Text size="1" color="gray">
                • Processed rows:{" "}
                {responseData.processedRows || responseData.total || "N/A"}
                <br />• Total employees:{" "}
                {responseData.totalEmployees || responseData.total || "N/A"}
                <br />• Average salary: ${responseData.averageSalary || "N/A"}
                <br />
                {responseData.errors && responseData.errors.length > 0 && (
                  <Text size="1" color="red">
                    • Errors found: {responseData.errors.length}
                  </Text>
                )}
              </Text>
            </Flex>
          </Box>
        )}
      </Card>
    </Flex>
  );
}
