VM_OPTIONS=" -Dpeer.privateKey=AFF6A83FEFFF6FF0C9F6FFFE41F6FF10D9FFFF3F41FFCFBF41F6FF90DFFFFF91" 
VM_OPTIONS+=" -Dpeer.port=50501"
VM_OPTIONS+=" -Drpc.providers.web.http.port=4444 -Drpc.providers.web.http.enabled=true "
VM_OPTIONS+=" -Drpc.providers.web.ws.enabled=true -Drpc.providers.web.ws.port=4451 "
VM_OPTIONS+=" -Ddatabase.dir=./rskj/local-1/database -Dlog.file=OFF -Dlog.out=ON "
VM_OPTIONS+=" -Dminer.server.enabled=true -Dminer.client.autoMine=true "
VM_OPTIONS+=" -Dsync.peer.count=20 "
VM_OPTIONS+=" -Xms500M -Xmx1G -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./java_pid%p.hprof -XX:+UseGCOverheadLimit "
VM_OPTIONS+=" -Dpublic.ip=127.0.0.1"

echo "java $VM_OPTIONS -cp ./rskj/rskj-core/build/libs/rskj-core-3.1.0-SNAPSHOT-all.jar co.rsk.Start --regtest"
java $VM_OPTIONS -cp ./rskj/rskj-core/build/libs/rskj-core-3.1.0-SNAPSHOT-all.jar co.rsk.Start --regtest &

tail -10f logs/rsk.log
