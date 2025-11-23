import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { posts } from "@/app/data/posts";

export function BlogSidebar() {
  return (
    <aside 
      className="space-y-8 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* プロフィール / 会社紹介 */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
            <Image src="/images/relayo-icon.png" alt="Relayo" fill className="object-cover" />
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900">Relayo編集部</div>
            <div className="text-xs text-gray-500">Web制作・集客のプロ</div>
          </div>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed mb-4 tracking-wide">
          「作って終わり」にしない、成果にコミットするWeb制作チーム。中小企業のデジタル化を全力で支援しています。
        </p>
        <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
          <Link href="/company">運営会社について</Link>
        </Button>
      </div>

      {/* 最新記事リスト */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h4 className="font-bold text-sm text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center">
          <span className="bg-blue-600 w-1 h-4 mr-2 rounded-full"></span>
          最新の記事
        </h4>
        <ul className="space-y-5">
          {posts.slice(0, 5).map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex gap-3 items-start">
                {post.thumbnail ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100 border border-gray-100">
                    <Image src={post.thumbnail} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="h-16 w-16 shrink-0 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Img</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors tracking-wide">
                    {post.title}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1 block font-mono">{post.date}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}