import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#003344] mb-6 relative">
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500"></span>
        </h2>
        <p className="text-gray-600 mb-8">
          We&apos;re here to help you with all your real estate needs. Reach out
          to us through any of the channels below or visit our office.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#003344] p-6 flex items-center justify-center sm:w-1/4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="p-6 sm:w-3/4">
                <h3 className="font-semibold text-lg mb-2 text-[#003344]">
                  Our Office
                </h3>
                <p className="text-gray-600">
                  One Kattameya, 215, Maadi Kattameya Ringroad - Cairo, Egypt
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-2 text-orange-500 hover:text-orange-600"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=One+Kattameya,+215,+Maadi+Kattameya+Ringroad,+Cairo,+Egypt",
                      "_blank"
                    )
                  }
                >
                  Get Directions <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#003344] p-6 flex items-center justify-center sm:w-1/4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div className="p-6 sm:w-3/4">
                <h3 className="font-semibold text-lg mb-2 text-[#1e2629]">
                  Phone
                </h3>
                <p className="text-gray-600">+0201123960001</p>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-2 text-orange-500 hover:text-orange-600"
                  onClick={() => window.open("tel:+0201123960001", "_blank")}
                >
                  Call Now <Phone className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#003344] p-6 flex items-center justify-center sm:w-1/4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="p-6 sm:w-3/4">
                <h3 className="font-semibold text-lg mb-2 text-[#003344]">
                  Email
                </h3>
                <p className="text-gray-600">sales@strada-properties.com</p>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-2 text-orange-500 hover:text-orange-600"
                  onClick={() =>
                    window.open("mailto:sales@strada-properties.com", "_blank")
                  }
                >
                  Send Email <Mail className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#003344] p-6 flex items-center justify-center sm:w-1/4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="p-6 sm:w-3/4">
                <h3 className="font-semibold text-lg mb-2 text-[#003344]">
                  Working Hours
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="font-medium">Sunday-Thursday:</span> 9:00
                    AM - 5:00 PM
                  </p>
                  <p>
                    <span className="font-medium">Friday-Saturday:</span> Closed
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="border-none shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video w-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17009.988833605094!2d31.3556749!3d29.9794952!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583b1d2910a709%3A0xed1ac0ba13c33c33!2sSky%20Holding!5e1!3m2!1sen!2seg!4v1735029913132!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Strada Properties Location"
              ></iframe>
            </div>
            <div className="p-6 bg-[#003344] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Visit Our Office
                  </h4>
                  <p className="text-sm text-gray-200">
                    Located in the heart of New Cairo, easily accessible from
                    the Ring Road
                  </p>
                </div>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=One+Kattameya,+215,+Maadi+Kattameya+Ringroad,+Cairo,+Egypt",
                      "_blank"
                    )
                  }
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
