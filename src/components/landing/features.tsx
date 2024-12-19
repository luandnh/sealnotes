import { LockKeyhole, IdCard, Github, GlobeLock, type LucideIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card"

type FeatureProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function Features() {
  const features: FeatureProps[] = [
    {
      icon: LockKeyhole,
      title: "Set a password for your notes",
      description: "We never store your password. Instead, your password is used as a key to encrypt your notepad. The encrypted output is then stored in our database, and without the password, it is essentially just a random set of characters."
    },
    {
      icon: GlobeLock,
      title: "Hashed Site names",
      description: "Your site or notepad names are hashed before being stored in our database. This ensures that even if your password is compromised, it is impossible for anyone to determine your site name."
    },
    {
      icon: IdCard,
      title: "No login" ,
      description: "Since we only need a password to encrypt your notes, there's no need for you to log in or provide your email or any other personal information."
    },
    {
      icon: Github,
      title: "Fully open-source",
      description: "We are fully open-source on Github. You can feel free to fork the repo and self-deploy or make some customized changes for yourself."
    },
  ];

  return (
    <div className='flex justify-center items-center my-10'>
      <Card className="overflow-hidden w-[1000px]">
        <div className="flex flex-col lg:flex-row">
          <CardContent className="flex-1 p-6 lg:p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-zinc-500">Encrypted Notepad</h3>
                <h2 className="mt-2 text-2xl lg:text-3xl font-semibold tracking-tight">
                  Protect your notes with a secure password.
                </h2>
              </div>
              <div className="space-y-5 mb-10">
                {features.map((feature, index) => (
                  <Feature 
                    key={index} 
                    icon={feature.icon} 
                    title={feature.title} 
                    description={feature.description} 
                  />
                ))}
              </div>

            </div>
          </CardContent>
          <div className="flex-1 bg-zinc-100 min-h-[300px] lg:min-h-0 hidden lg:block">
            <img 
              src="/editor.png" 
              alt="Password manager interface" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-lg border border-black/10 p-1 flex-shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  )
}
