"use client"
import { Client } from "@/app/[...slug]/client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { decrypt, hashPassword } from "@/app/utils/vault"

interface DecryptProps {
  params: string;
  encryptedData: string; 
}

export function DecryptSite({ params, encryptedData }: DecryptProps) {
  const [password, setPassword] = React.useState("");
  const [decryptedData, setDecryptedData] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    const hash = hashPassword(password)
    setError(null);
    setDecryptedData(null); 
    if (!encryptedData || !password) {
      setError("Encrypted data or password is missing.");
      return;
    }

    try {
      const decrypted = decrypt(encryptedData, hash);
      setDecryptedData(decrypted); 
    } catch (error) {
      console.error("Decryption error:", error);
      setError("Failed to decrypt data. Please check your password.");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {decryptedData ? (
        <Client params={params} decryptedData={decryptedData} hash={hashPassword(password)}/>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>This site is taken.</CardTitle>
            <CardDescription>
              If this is not your site, you can try a different one{" "}
              <Link href="/" className="text-blue-500 hover:underline">
                here
              </Link>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit" onClick={handleSubmit}>Decrypt</Button>
            <Link href="/">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
