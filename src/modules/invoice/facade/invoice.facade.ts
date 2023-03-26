import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _generateUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._findUseCase = useCaseProps.findUseCase;
    this._generateUseCase = useCaseProps.generateUseCase;
  }

  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return this._findUseCase.execute(input);
  }

  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateUseCase.execute(input);
  }
}
