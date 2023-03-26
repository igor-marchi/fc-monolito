import Invoice from "../../domain/invoice";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._invoiceRepository.find(input.id);
    return transformToOutputData(invoice);
  }
}

function transformToOutputData(invoice: Invoice): FindInvoiceUseCaseOutputDTO {
  const itensOutput = invoice.items.map((item) => ({
    id: item.id.id,
    name: item.name,
    price: item.price,
  }));

  const addressOutput = {
    city: invoice.address.city,
    complement: invoice.address.complement,
    number: invoice.address.number,
    state: invoice.address.state,
    street: invoice.address.street,
    zipCode: invoice.address.zipCode,
  };

  const output: FindInvoiceUseCaseOutputDTO = {
    id: invoice.id.id,
    document: invoice.document,
    createdAt: invoice.createdAt,
    items: itensOutput,
    name: invoice.name,
    total: invoice.total,
    address: addressOutput,
  };

  return output;
}
