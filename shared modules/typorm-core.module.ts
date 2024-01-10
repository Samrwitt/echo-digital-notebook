// typeorm-core.module.ts

import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (moduleRef: ModuleRef) => {
        // Your logic to create TypeOrmModuleOptions
        const options: TypeOrmModuleOptions = {
          // Configure your TypeORM options here
        };

        return options;
      },
      inject: [ModuleRef], // Inject ModuleRef here
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmCoreModule {}
