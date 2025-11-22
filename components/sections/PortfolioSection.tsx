import Link from "next/link";
import Image from "next/image"; // ▼ 追加
import { ArrowRight, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { works } from "@/app/data/works";

export default function PortfolioSection() {
  const latestWorks = works.slice(0, 3);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Works
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              制作実績・事例の一部をご紹介します。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestWorks.map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.id}`}
                className="group block h-full"
              >
                <Card className="flex h-full flex-col overflow-hidden border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  
                  {/* ▼ 画像がある場合はImage、なければ色ベタを表示 */}
                  {work.thumbnail ? (
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <Image
                        src={work.thumbnail}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className={`aspect-video w-full ${work.imageColor} flex items-center justify-center text-gray-400`}>
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  
                  <CardHeader className="space-y-2 p-5">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px] font-medium">
                        {work.category}
                      </Badge>
                      <div className="flex items-center text-[10px] text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {work.date}
                      </div>
                    </div>
                    <CardTitle className="text-sm font-bold leading-snug text-gray-900 group-hover:text-blue-700">
                      {work.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-xs text-gray-600">
                      {work.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="mt-auto p-5 pt-0">
                     <div className="flex items-center text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                       詳細を見る <ArrowRight className="ml-1 h-3 w-3" />
                     </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/works">
                実績一覧を見る <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}