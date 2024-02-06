import PrintnodeService from '@/services/printnode.service';

const EPSON_PRINTER_ID = 73034444;

export default class PrintnodeEndpoints {

    static async createPrintJob({ title, content }) {

        return PrintnodeService({
            method: 'POST',
            url: '/printers',
            data: {
                "printerId": EPSON_PRINTER_ID,
                "title": title,
                "contentType": "pdf_uri",
                "content": "https://mon-pos-front.vercel.app/bill.pdf",
                "source": "Monchef POS"
            }
        });
    }
}