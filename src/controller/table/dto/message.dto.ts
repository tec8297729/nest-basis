import { ApiProperty } from '@nestjs/swagger';

export class GetMerchantChannelAuditLogReq {
  @ApiProperty({
    description: '商户或者渠道id',
  })
  merchantChannelId: number;
  @ApiProperty({
    description: '1-商户 2-渠道',
  })
  type: number;
}
