import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "fs";
import { join } from "path";
import { Container } from "@/components/ui/container";

export async function generateMetadata() {
  return {
    title: "Mentions Légales - Amazonia Investing",
    description:
      "Mentions légales et informations juridiques d'Amazonia Investing",
  };
}

export default async function MentionsLegalesPage() {
  // Lire le fichier markdown
  const filePath = join(
    process.cwd(),
    "app/mentions-legales/mentions-legales.md"
  );
  const markdownContent = readFileSync(filePath, "utf-8");

  return (
    <Container className="py-32">
      <div className="max-w-4xl mx-auto">
        {/* Contenu MDX */}
        <div className="markdown">
          <MDXRemote source={markdownContent} />
        </div>
      </div>
    </Container>
  );
}
