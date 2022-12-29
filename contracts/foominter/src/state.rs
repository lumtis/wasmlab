// use `cw_storage_plus` to create ORM-like interface to storage
// see: https://crates.io/crates/cw-storage-plus

use cosmwasm_std::{Addr};

use cw_storage_plus::Item;

pub const FOO_TOKEN: Item<Addr> = Item::new("foo_token");