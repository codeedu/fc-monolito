import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../invoice/domain/address.vo";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.dto";

export default class AddClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(_ClientRepository: ClientGateway) {
    this._clientRepository = _ClientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
    };

    const client = new Client(props);
    this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
