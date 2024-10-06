import Image from "next/image";

export default function Footer() {
  
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="mailto:daniel.samborski222@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/svg/email.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Email
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.linkedin.com/in/daniel-samborski/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/svg/linkedin.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            LinkedIn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/popki222"
            target="_blank"
            rel="noopener noreferrer"
            
          >
            <Image
              aria-hidden
              src="/svg/github.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Github
          </a>
        </footer>
    );
  }