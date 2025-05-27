import ImageWrapper from "@/components/ImageWrapper";
import Tag from "@/components/Tag";
import { FaLinkedin, FaGithub, FaStrava } from "react-icons/fa6";
import { getProfile } from "@/services/Github.service";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { avatarUrl } = await getProfile();
  return {
    title: {
      template: `%s | Sobre mim`,
      default: "Sobre mim",
    },
    description: "Um pouco sobre mim",
    openGraph: {
      type: "profile",
      url: `https://echoesfromthejourney.com/about`,
      title: "Sobre mim",
      description: "Um pouco sobre mim",
      images: [
        {
          url: avatarUrl,
          alt: "Avatar de perfil",
        },
      ],
      firstName: "João",
      lastName: "Fanchini",
      gender: "male",
    },
  };
}

export default async function AboutPage() {
  const { avatarUrl } = await getProfile();

  return (
    <div className="flex flex-col gap-6 mx-auto">
      <ImageWrapper
        src={avatarUrl}
        alt="Profile image"
        className="rounded-full max-w-[300px] mx-auto"
      />
      <div>
        <section className="flex gap-4 justify-center">
          <Tag
            label="LinkedIn"
            href="https://www.linkedin.com/in/jvfazevedo"
            bgColorClass="bg-blue-700 hover:bg-blue-800"
            icon={<FaLinkedin className="inline" />}
          />
          <Tag
            label="GitHub"
            href="https://github.com/joaofanchini"
            bgColorClass="bg-gray-700 hover:bg-gray-600 text-white"
            icon={<FaGithub className="inline" />}
          />
          <Tag
            label="Strava"
            href="https://strava.app.link/B3gGaO4mVSb"
            bgColorClass="bg-orange-500 hover:bg-orange-600 text-white"
            icon={<FaStrava className="inline" />}
          />
        </section>
        <section className="flex flex-col gap-4 mt-4">
          <p className="text">
            Engenheiro de software. Curioso sobre como as coisas são
            construídas.
          </p>
          <p className="text">
            Experiente em desenvolvimento backend, arquiteturas escaláveis e
            microsserviços, mas faço de tudo!!!
          </p>
          <p className="text">
            Apaixonado por corrida e esportes de endurance.
          </p>
          <p className="text">Cristão em todas as áreas da vida.</p>
        </section>
      </div>
    </div>
  );
}
