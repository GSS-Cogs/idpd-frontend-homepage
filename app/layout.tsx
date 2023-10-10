import "./main.scss";

import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

export const metadata = {
  title: "Welcome to IDS Data Explorer",
  description: "Use the IDS Data Explorer to find and download data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="govuk-template">
      <body className="govuk-template__body">
        <SkipLink />
        {children}
        <Footer />
      </body>
    </html>
  );
}
