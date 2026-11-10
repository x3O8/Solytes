import { saveEnquiry } from '@/lib/enquiries';
export async function POST(request: Request) {
  return saveEnquiry(request, {
    url: process.env.SOLYTES_SHEETS_WEBHOOK_URL,
    token: process.env.SOLYTES_SHEETS_WEBHOOK_TOKEN,
  });
}
