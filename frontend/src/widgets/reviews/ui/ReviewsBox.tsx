// Ваш компонент Reviews становится чище:
import { HorizontalScroll } from '@/shared/ui/HorizontalScroll/HorizontalScroll';
import { CommentCard } from "./CommentCard";
import { comments } from "../model/comments";

export const Reviews = () => {
  return (
    <div className="w-full bg-linear-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-16">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-gray-800">Отзывы</span>
        </div>

        <HorizontalScroll buttonSize="lg">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </HorizontalScroll>

        <div className="text-center mt-8">
          <span className="text-sm text-gray-400">{comments.length} отзывов</span>
        </div>
      </div>
    </div>
  );
};