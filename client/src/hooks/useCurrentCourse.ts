import { useGetCourseQuery } from "@/state/apiDevelopment";
import { useSearchParams } from "next/navigation";

export const useCurrentCourse = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id") ?? "";
  const { data: course, ...rest } = useGetCourseQuery(courseId);
  return { course, courseId, ...rest };
};