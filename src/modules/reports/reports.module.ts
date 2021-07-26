import { Module } from '@nestjs/common'
import { ReportResolver } from './report.resolver'
import { ReportService } from './reports.service'

@Module({
  providers: [ReportService, ReportResolver]
})
export class ReportsModule {}
