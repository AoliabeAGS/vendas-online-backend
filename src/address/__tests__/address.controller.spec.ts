import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';
import { createAddressMock } from '../__mocks__/create-addres.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { addressMock } from '../__mocks__/address.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: {
            createAddress: jest.fn().mockResolvedValue(addressMock),
            findAllAddressByUserId: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addressService).toBeDefined();
  });

  it('should address Entity in create method', async () => {
    const address = await controller.createAddress(
      createAddressMock,
      userEntityMock.id,
    );

    expect(address).toEqual(addressMock);
  });

  it('should address Entity in find method', async () => {
    const address = await controller.findAllAddressByUserId(userEntityMock.id);

    expect(address).toEqual([
      {
        complement: addressMock.complement,
        numberAddress: addressMock.numberAddress,
        cep: addressMock.cep,
      },
    ]);
  });
});
