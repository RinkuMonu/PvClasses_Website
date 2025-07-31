"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  slug: string
  index: number
}

// export default function BlogCard({ title, excerpt, image, date, author, slug, index }: BlogCardProps) {
//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group"
//     >
//       {/* <Link href={`/blog/${slug}`} className="block"> */}
//       <div className="block">
//         <div className="relative h-48 sm:h-64 overflow-hidden">
//           <Image
//             src={image || "/placeholder.svg"}
//             alt={title}
//             fill
//             className="object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         </div>
//         <div className="p-6">
//           <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 space-x-4">
//             <div className="flex items-center">
//               <Calendar className="h-4 w-4 mr-1" />
//               <span>{date}</span>
//             </div>
//             <div className="flex items-center">
//               <User className="h-4 w-4 mr-1" />
//               <span>{author}</span>
//             </div>
//           </div>
//           <h3 className="text-xl font-bold mb-2 group-hover:text-[#ab6545] dark:group-hover:text-[#e8ab8f] transition-colors">
//             {title}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{excerpt}</p>
//         </div>
//       </div>
//       {/* </Link> */}
//     </motion.article>
//   )
// }

export default function BlogCard({ data, index }: BlogCardProps) {
  const { title, summary, image, created_at, slug } = data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* <Link href={`/blog/${slug}`} className="block group"> */}
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>Admin</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-[#ab6545] dark:group-hover:text-[#e8ab8f] transition-colors">
            {title.slice(0, 50) + "..."}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3"> {summary.split(" ").slice(0, 10).join(" ")}...</p>
        </div>
      </article>
      {/* </Link> */}
    </motion.div>
  )
}