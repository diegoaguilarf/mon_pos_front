import ApitemplateioService from '@/services/apitempleteio.service';

export default class ApitemplateioEndpoints {

    static async createPDF({ body, template_id }) {
        return ApitemplateioService({
            method: 'POST',
            url: '/create-pdf',
            data: body,
            params: {
                template_id
            }
        });
    }
}