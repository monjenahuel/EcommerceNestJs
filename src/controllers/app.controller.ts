import { Controller} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ProductoService } from 'src/services/producto.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly productoService: ProductoService) {};


}
