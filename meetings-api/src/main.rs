use crate::repo::event_repo::PostgresEventRepo;

use actix_cors::Cors;
use actix_web::http::header;
use actix_web::{middleware, web, App, HttpResponse, HttpServer};
use dotenv::dotenv;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use std::env;
use std::sync::Arc;

const ALLOWED_ORIGIN: &str = "http://localhost:3000";

mod handlers;
mod lib;
mod models;
mod repo;

async fn init_pool() -> anyhow::Result<Pool<Postgres>> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    Ok(pool)
}

#[actix_web::main]
async fn main() -> anyhow::Result<()> {
    println!("Hello, world!");

    let pool = Arc::new(init_pool().await?);

    let event_repo = Arc::new(PostgresEventRepo::new(pool.clone()));

    HttpServer::new(move || {
        // `move` to take the ownership of `private_key`
        App::new()
            // .wrap(middleware::Logger::default())
            // .wrap(
            //     Cors::default()
            //         .allowed_origin(ALLOWED_ORIGIN)
            //         .allowed_methods(vec!["GET", "POST", "DELETE"])
            //         .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            //         .allowed_header(header::CONTENT_TYPE)
            //         .max_age(3600)
            //         .supports_credentials(), // Allow the cookie auth.
            // )
            .app_data(web::Data::new(event_repo.clone()))
            .service(web::resource("/meetings").route(web::get().to(handlers::events)))
            .route("/", web::get().to(|| HttpResponse::Ok().body("/")))
    })
    .bind("127.0.0.1:5000")?
    .run()
    .await?;
    Ok(())
}
