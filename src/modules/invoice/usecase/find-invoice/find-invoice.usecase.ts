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
  const itensOutput = invoice.getItens.map((item) => ({
    id: item.id.id,
    name: item.name,
    price: item.price,
  }));

  const addressOutput = {
    city: invoice.getAddress.getCity,
    complement: invoice.getAddress.getComplement,
    number: invoice.getAddress.getNumber,
    state: invoice.getAddress.getState,
    street: invoice.getAddress.getStreet,
    zipCode: invoice.getAddress.getZipCode,
  };

  const output: FindInvoiceUseCaseOutputDTO = {
    id: invoice.id.id,
    document: invoice.getDocument,
    createdAt: invoice.createdAt,
    items: itensOutput,
    name: invoice.getName,
    total: invoice.getTotal,
    address: addressOutput,
  };

  return output;
}
