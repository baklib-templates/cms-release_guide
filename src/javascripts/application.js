import * as Turbo from "@hotwired/turbo"
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import { Application } from "@hotwired/stimulus"
import LoadMoreController from "./../controllers/load_more_controller"

window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.start()

import "./../controllers"
const application = Application.start()
application.register("load-more", LoadMoreController)
