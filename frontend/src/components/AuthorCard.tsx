import React from 'react'
import { Button } from './ui/button';
import { getAvatarInitials } from './BlogCard';

interface AuthorCardProps {
  name: string;
  username: string;
  bio: string;
}

export default function AuthorCard({
  name,
  username,
  bio,
}: AuthorCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
          {getAvatarInitials(name)}
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-black">
            {name}
          </h3>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">
              @{username}
            </span>

            <span className="text-gray-300">•</span>

            <button className="font-medium text-blue-600 hover:text-blue-700">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-sm leading-7 text-gray-600">
        {bio}
      </p>

      {/* Button */}
      <Button
        variant="outline"
        className="mt-5 w-full h-11 font-medium"
      >
        View Profile
      </Button>
    </div>
  );
}