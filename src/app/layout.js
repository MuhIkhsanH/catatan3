import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import Footer
// import SplashCursor from "../../anm/SplashCursor/SplashCursor";
import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyApp",
  description: "Glassmorphism Notes App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-20 text-white">
        <Navbar />
        {/* <SplashCursor /> */}
        {children}
        <Footer /> {/* Add Footer here */}
      </body>
    </html>
  );
}
