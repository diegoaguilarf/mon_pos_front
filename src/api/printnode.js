import PrintnodeService from '@/services/printnode.service';

const EPSON_PRINTER_ID = 74252398;

export default class PrintnodeEndpoints {

    static async createPrintJob({ title, content }) {
        return PrintnodeService({
            method: 'POST',
            url: '/printjobs',
            data: {
                "printerId": EPSON_PRINTER_ID,
                "title": title.toString(),
                "contentType": "pdf_uri",
                "content": content,
                "source": "Monchef POS"
            }
        });
    }
}