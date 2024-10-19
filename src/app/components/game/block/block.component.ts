import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlockStatus} from "../../../enums/game.enums";
import {BLOCK_CLASSES} from "../../../constants/game.constants";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  @Input() status: BlockStatus = BlockStatus.Pending;
  @Output() clickBlock = new EventEmitter<void>();

  OnClick(): void {
    if (this.status === BlockStatus.Current) {
      this.clickBlock.emit();
    }
  }

  getBlockClass(): string {
    return BLOCK_CLASSES[this.status];
  }
}
