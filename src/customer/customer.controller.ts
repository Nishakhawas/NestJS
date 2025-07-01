import { Controller,Get, Post,Body, NotFoundException, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';  // ← THIS LINE
import { CustomerService } from './customer.service';
import { Customer } from '../Entity/customer.entity'; // adjust the path to your entity

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService:CustomerService ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }
@Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

 @Get(':id')
async findOne(@Param('id',ParseIntPipe) id: number): Promise<Customer> {
  const customer = await this.customerService.findOne(id); // +id to cast to number

  if (!customer) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }

  return customer;
}

@Delete(':id')
async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
  const customer = await this.customerService.findOne(id);
  if (!customer) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }
  await this.customerService.delete(id);
  return;
}

@Put(':id')
async update( 
  @Param('id', ParseIntPipe) id: number,
  @Body() updateCustomerDto: CreateCustomerDto,
): Promise<Customer> {
  const customer = await this.customerService.findOne(id);
  if (!customer) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }
  return this.customerService.update(id, updateCustomerDto);
}

}