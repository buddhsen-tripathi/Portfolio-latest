import Hero from "@/components/sections/hero";
import Layout from "@/components/layout/layout";
import { fetchGitHubContributions } from "@/lib/github";

export const metadata = {
  title: "Shiva Bhattacharjee",
};

export default async function About() {
  const contributionData = await fetchGitHubContributions();

  return (
    <div className="overflow-x-hidden">
      <Layout>
        <Hero contributionData={contributionData} />
      </Layout>
    </div>
  );
}
