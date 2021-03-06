# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_21_153241) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "candidates", force: :cascade do |t|
    t.string "display_name"
    t.string "bio"
    t.string "avatar_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "pipeline_applications", force: :cascade do |t|
    t.bigint "candidate_id", null: false
    t.bigint "pipeline_id", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "priority", default: 0
    t.index ["candidate_id"], name: "index_pipeline_applications_on_candidate_id"
    t.index ["pipeline_id"], name: "index_pipeline_applications_on_pipeline_id"
    t.index ["status"], name: "index_pipeline_applications_on_status"
  end

  create_table "pipelines", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_pipelines_on_slug", unique: true
  end

  add_foreign_key "pipeline_applications", "candidates"
  add_foreign_key "pipeline_applications", "pipelines"
end
