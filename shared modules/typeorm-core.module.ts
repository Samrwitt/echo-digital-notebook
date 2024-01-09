// typeorm-core.module.ts

import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [/* Other modules you need */],
  providers: [
    {
      provide: 'TypeOrmModuleOptions',
      useFactory: async () => {
        // Your logic to create TypeOrmModuleOptions
      },
      inject: [ModuleRef], // Ensure that ModuleRef is injected here
    },
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmCoreModule {}
