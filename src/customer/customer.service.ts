import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../Entity/customer.entity'; // adjust the path to your entity 
import { CreateCustomerDto } from './dto/create-customer.dto'; // ← HERE

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const Customer = this.customerRepo.create(createCustomerDto);
    return this.customerRepo.save(Customer);
  }
    findAll(): Promise<Customer[]> {
        return this.customerRepo.find();
    }

async findOne(id: number): Promise<Customer | null> {
  console.log('Fetching customer with id:', id);
  const customer = await this.customerRepo.findOneBy({ id });
  console.log('Result:', customer);
  return customer;
}

async delete(id: number): Promise<void> {
  const result = await this.customerRepo.delete(id);
  if (result.affected === 0) {
    throw new Error(`Customer with ID ${id} not found`);
  } 
}

async update(id: number, updateCustomerDto: CreateCustomerDto): Promise<Customer> {
  const customer = await this.customerRepo.findOneBy({ id });
  if (!customer) {
    throw new Error(`Customer with ID ${id} not found`);
  }
  Object.assign(customer, updateCustomerDto);
  return this.customerRepo.save(customer);
}

}
