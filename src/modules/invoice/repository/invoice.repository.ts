import Invoice from "../domain/invoice";
import InvoiceGateway from "../gateway/invoice.gateway";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    throw new Error("Not");
  }
  async generate(invoice: Invoice): Promise<Invoice> {
    throw new Error("Not");
  }
}
