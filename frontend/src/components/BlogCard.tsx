import React from 'react'

interface BlogCardProps {
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}
export const BlogCard = ({authorName,title,content,publishedDate}:BlogCardProps) => {
  return (
    <div className=' border-b border-slate-300 p-4 pb-5'>
        <div className='font-mono flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
                <div><Avatar name={authorName}/></div>
                <div className=''>{authorName}</div>
                <div className='h-1 w-1 bg-slate-500 rounded-full'></div>
                <div className='text-slate-500'>{publishedDate}</div>
            </div>
            <div className='font-mono text-3xl font-extrabold'>{title}</div>
            <div className='line-clamp-2 text-lg text-slate-700'>{content}</div>
            <div className='bg-gray-200 text-gray-600 text-xs rounded-lg w-fit px-1.5 py-1'>{`${Math.ceil(content.length/100)} minute read`}</div>
        </div>
    </div>
  )
}

export function getAvatarInitials(name: string): string {
  if(!name){
    return "?"
  }
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (
    words[0][0] +
    words[1][0]
  ).toUpperCase();
}

export function Avatar({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full">
            <span className="font-medium text-xs text-white">{getAvatarInitials(name)}</span>
        </div>
}