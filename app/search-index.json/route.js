import { searchIndex } from "@/lib/content";
export const dynamic = "force-static";
export function GET() { return Response.json(searchIndex()); }
