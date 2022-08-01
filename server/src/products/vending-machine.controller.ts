import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BuyerGuard } from 'src/auth/buyer.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { BuyProductResponseDto } from './dto/buy-product-response.dto';
import { BuyProductDto } from './dto/buy-product.dto';
import { ChangeDto } from './dto/change.dto';
import { DepositDto } from './dto/deposit.dto';
import { VendingMachineService } from './vending-machine.service';

@Controller('vending-machine')
export class VendingMachineController {
  constructor(private vendingMachineService: VendingMachineService) {}

  @Post('/deposit')
  @UseGuards(AuthGuard(), BuyerGuard)
  deposit(
    @Body() depositDto: DepositDto,
    @GetUser() user: JwtPayload,
  ): Promise<ReadUserDto> {
    return this.vendingMachineService.deposit(user.id, depositDto);
  }

  @Post('/buy')
  @UseGuards(AuthGuard(), BuyerGuard)
  buy(
    @Body() buyProductDto: BuyProductDto,
    @GetUser() user: JwtPayload,
  ): Promise<BuyProductResponseDto> {
    return this.vendingMachineService.buy(user.id, buyProductDto);
  }

  @Post('/reset')
  @UseGuards(AuthGuard(), BuyerGuard)
  reset(@GetUser() user: JwtPayload): Promise<ChangeDto> {
    return this.vendingMachineService.reset(user.id);
  }
}
