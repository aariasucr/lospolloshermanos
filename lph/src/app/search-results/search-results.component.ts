import {Component, OnInit} from "@angular/core";
import {SearchService} from "../shared/search.service";
import {UserService} from "../shared/user.service";
import {SearchResult} from "../shared/model";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  public numberOfResults: number;
  public searchValue: string;
  public listResults;
  public showSpinner: boolean;

  constructor(private searchService: SearchService, private userService: UserService) {}

  ngOnInit() {
    this.numberOfResults = 0;
    this.searchValue = "not set";
    this.listResults = [];
    this.showSpinner = true;

    this.searchService.getValueToSearch().subscribe((val) => {
      let rr = [];
      this.searchValue = val;
      if (this.searchValue != null && this.searchValue.length > 0) {
        this.listResults = [];
        this.searchService.fetchResults(this.searchValue).then((r) => {
          if (r.val() != null) {
            let keys = Object.keys(r.val());
            this.numberOfResults = keys.length;
            keys.forEach((key) => {
              if (key != this.userService.getUserId()) {
                let sr: SearchResult = {
                  id: key,
                  name: r.val()[key].fullName,
                  photo: r.val()[key].profilePhoto
                };
                rr.push(sr);
              } else {
                this.numberOfResults--;
              }
            });
            this.listResults = rr;
            this.showSpinner = false;
            console.log("rr", this.listResults);
          } else {
            this.numberOfResults = 0;
            this.showSpinner = false;
          }
        });
      }
    });
  }
}
