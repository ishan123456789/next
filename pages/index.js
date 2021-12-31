import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddContactForm } from "../components/AddContact";
import { ContactCard } from "../components/Card";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/login");
      } else {
        setEmail(session.user.email);
        setIsLoading(false);
      }
    });
  }, [router]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="container mx-auto">
        <ContactCard title={email} />
        <AddContactForm />
      </div>
    </div>
  );
}
