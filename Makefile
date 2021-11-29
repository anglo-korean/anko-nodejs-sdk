DOCUMENTATION_CHECKOUT ?= ../documentation

proto:
	mkdir -p $@

proto/gateway.proto: $(DOCUMENTATION_CHECKOUT)/proto/gateway.proto | proto
	cp $< $@
