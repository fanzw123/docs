# snapshoot-remove 层移除设计

## 设计目标
- 移除 db_snapshoot 层,直接从 db_sync 到 db_gather 层,提高效率

## 影响层面

- db_gather 层的数据是从 db_snapshoot 获取的，所以要把 db_gather 中涉及到 db_snapshoot 层的数据迁移到 db_sync 中获取

- 基于 [m2h-increment-design](m2h-increment-design.md) 增量的需求变动，每日分区中的数据，导入到 db_gather 层，抱着只导入增量数据,而非全表导入

- db_gather 中历史数据的处理
