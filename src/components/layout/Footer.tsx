import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/20 transition-colors">
      <div className="container px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/zulo-logo.png"
                alt="Zulo Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold tracking-tight text-primary">
                ZULO
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Platform properti modern yang membantu Anda menemukan hunian
              impian dengan teknologi terdepan dan pengalaman pengguna yang
              seamless.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
              Tautan Cepat
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Properti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
              Tipe Properti
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/properties?type=luxury"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Villa Mewah
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Apartemen Modern
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=house"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Rumah Keluarga
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span>Jl. Kuningan Tower 5, Jakarta Selatan</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+62 (21) 808-9900</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>hello@zulo.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} ZULO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
