import type { Metadata } from "next";
import ListOfCertificates from "@/features/user/resources/pages/ListOfCertificates";

export const metadata: Metadata = {
  title: "Certifications | Emple",
  description: "Explore AWS, Cisco, Google Cloud, TensorFlow and other professional certifications.",
};

export default function Page() {
  return <ListOfCertificates />;
}